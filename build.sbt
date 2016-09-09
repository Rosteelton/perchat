name := "perchat"

version := "1.0"

scalaVersion := "2.11.8"

val circeVersion = "0.5.1"

libraryDependencies ++= Seq(
  "org.typelevel" %% "cats" % "0.7.0",
  "com.typesafe.akka" %% "akka-http-experimental" % "2.4.9",
  "com.typesafe.akka" %% "akka-http-jackson-experimental" % "2.4.9",
  "com.typesafe.akka" %% "akka-http-spray-json-experimental" % "2.4.9",
  "com.typesafe.akka" %% "akka-stream" % "2.4.9",
  "io.circe" %% "circe-core" % circeVersion,
  "io.circe" %% "circe-generic" % circeVersion,
  "io.circe" %% "circe-parser" % circeVersion
)

resolvers += Resolver.sonatypeRepo("releases")

addCompilerPlugin(
  "org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full
)