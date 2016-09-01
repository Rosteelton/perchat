import akka.actor.ActorRef

sealed trait ChatEvent
case class UserJoined(name: String, userActor: ActorRef) extends ChatEvent
case class UserLeft(name: String) extends ChatEvent
case class MessageReceived(sender: String, message: String) extends ChatEvent

case class ChatMessage(sender: String, message: String)
