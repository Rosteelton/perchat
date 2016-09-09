import akka.actor.{Actor, ActorRef}

class ChatActor extends Actor {

  var people = Map.empty[String, ActorRef]

  override def receive: Receive = {

    case UserJoined(name, userActor) =>
      people += name -> userActor
      people.values.foreach(_ ! ChatMessage("SYSTEM", s"Пользователь $name вошел в чат!"))

    case UserLeft(name) =>
      people -= name
      people.values.foreach(_ ! ChatMessage("SYSTEM", s"Пользователь $name покинул чат!"))

    case MessageReceived(sender, message) =>
      people.values.foreach(_ ! ChatMessage(sender, message))
  }
}
