import { type FunctionComponent } from "react";
import {Carousel} from "../../components/carousel";
import {Container, SpaceBetween, TextContent} from "@cloudscape-design/components";

export const HomePage: FunctionComponent = () => {
    const imgs = [
      "/1.jpg",
      "/2.jpg",
      "/3.jpg",
      "/4.jpg",
      "/5.jpg",
      "/6.jpg",
      "/7.jpg",
      "/8.jpg"
    ]
    return (
      <SpaceBetween size={"s"} direction={"vertical"} alignItems={"center"}>
          <Container>
              <SpaceBetween size={"s"} direction={"vertical"} alignItems={"center"}>
                  <TextContent>
                      <h1>Pardon our dust, our website is still under construction!</h1>
                  </TextContent>
              </SpaceBetween>
          </Container>
          <Carousel>
              {imgs.map((img) => <img src={img} alt={"Error retrieving image"} style={{width: "75vh", objectFit: "contain"}}/>)}
          </Carousel>
      </SpaceBetween>
    )
}