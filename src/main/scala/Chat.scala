import akka.NotUsed
import akka.actor._
import akka.http.scaladsl.model.ws.{Message, TextMessage}
import akka.stream.{ActorMaterializer, OverflowStrategy}
import akka.stream.scaladsl._
import io.circe.generic.auto._
import io.circe.syntax._

object Chat {

  implicit val actorSystem = ActorSystem("akka-system")
  implicit val flowMaterializer = ActorMaterializer()
  val chatActor: ActorRef = actorSystem.actorOf(Props(classOf[ChatActor]))


  def webSocketChatFlow(user: String): Flow[Message, Message, _] = {
    Flow[Message]
      .collect {
        case TextMessage.Strict(txt) => txt
      }
      .via(chatFlow(user))
      .map(msg => TextMessage.Strict(msg.asJson.noSpaces))
  }


  def chatFlow(sender: String): Flow[String, ChatMessage, Any] = {

    val in: Sink[String, NotUsed] = Flow[String].map(MessageReceived(sender, _)).to(Sink.actorRef[ChatEvent](chatActor, UserLeft(sender)))

    val out: Source[ChatMessage, Unit] = Source.actorRef[ChatMessage](1, OverflowStrategy.fail)
      .mapMaterializedValue(chatActor ! UserJoined(sender, _))

    Flow.fromSinkAndSource(in, out)
  }


}
