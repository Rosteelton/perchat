import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.typesafe.config.ConfigFactory
import Chat._

object Server extends App {


  val route: Route = get {
    pathSingleSlash {
      getFromResource("main.html")
    } ~ pathPrefix("css") {
      get {
        getFromResourceDirectory("css")
      }
    } ~ pathPrefix("images") {
      get {
        getFromResourceDirectory("images")
      }
    } ~
      pathPrefix("js") {
        get {
          getFromResourceDirectory("js")
        }
      } ~ {
      path("chat") {
        pathEndOrSingleSlash {
          parameter('name) { userName =>
            handleWebSocketMessages(Chat.webSocketChatFlow(userName))
          }
        }
      }
    }
  }

  val config = ConfigFactory.load()
  Http().bindAndHandle(route, config.getString("http-server.interface"), config.getInt("http-server.port"))
  println("Successfully binding!")

}
