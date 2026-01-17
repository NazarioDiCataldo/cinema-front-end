import { Link } from "react-router";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="w-full min-h-screen lg:max-h-screen bg-gray-200 relative">
      <picture className="w-full min-h-screen lg:max-h-screen">
        <img
          className="w-full min-h-screen lg:max-h-screen object-cover"
          src="./uploads/hollywood.jpg"
          alt="Image about the Hollywood Hill with its famous sign."
        />
      </picture>
      <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full px-4 md:w-md lg:w-2xl">
        <div className="text-center text-white flex flex-col items-center gap-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            A project featuring collections of movies, actors, and cinemas.
          </h1>
          <h2 className="text-lg lg:text-xl font-medium">
            Curated selections of Hollywood stars and iconic blockbuster and
            cult movies. Discover some of the world’s most famous cinemas. These
            lists will be updated soon.
          </h2>
          <div className="flex flex-col-reverse lg:flex-row lg:justify-center w-full lg:w-max gap-2 mt-2">
            <Button
              size={"lg"}
              variant={"secondary"}
              className="w-full"
              nativeButton={false}
              render={<Link to={"/movies"} className="block w-full" />}
            >
              View all movies
            </Button>
            <Button
              size={"lg"}
              className="w-full"
              nativeButton={false}
              render={<Link to={"/actors"} className="block w-full" />}
            >
              View all actors
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
