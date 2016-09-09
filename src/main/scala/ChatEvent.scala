import akka.actor.ActorRef
import io.circe.generic.JsonCodec

sealed trait ChatEvent
case class UserJoined(name: String, userActor: ActorRef) extends ChatEvent
case class UserLeft(name: String) extends ChatEvent
case class MessageReceived(sender: String, message: String) extends ChatEvent

@JsonCodec case class ChatMessage(sender: String, message: String)
