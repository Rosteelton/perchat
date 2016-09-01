name := "perchat"

version := "1.0"

scalaVersion := "2.11.8"


libraryDependencies ++= Seq(
  "org.typelevel" %% "cats" % "0.7.0",
  "com.typesafe.akka" %% "akka-http-experimental" % "2.4.9",
  "com.typesafe.akka" %% "akka-http-jackson-experimental" % "2.4.9",
  "com.typesafe.akka" %% "akka-http-spray-json-experimental" % "2.4.9",
  "com.typesafe.akka" %% "akka-stream" % "2.4.9"
)