import akka.actor.{Actor, ActorRef}

class ChatActor extends Actor {

  var people = Map.empty[String, ActorRef]

  override def receive: Receive = {

    case UserJoined(name, userActor) =>
      people += name -> userActor
      people.values.foreach(_ ! ChatMessage("System", s"New user:$name!"))

    case UserLeft(name) =>
      people -= name
      people.values.foreach(_ ! ChatMessage("System", s"User $name left!"))

    case MessageReceived(sender, message) =>
      people.values.foreach(_ ! ChatMessage(sender, message))
  }
}
