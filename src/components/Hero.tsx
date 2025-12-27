import { Link } from "react-router";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="w-full min-h-screen lg:max-h-screen bg-gray-200 relative">
      <picture className="w-full min-h-screen lg:max-h-screen">
        <img className="w-full min-h-screen lg:max-h-screen object-cover" src="./uploads/hollywood.jpg" />
      </picture>
      <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full px-4 md:w-md lg:w-2xl">
        <div className="text-center text-white flex flex-col items-center gap-4">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Project about a colletions of movies, actors and halls.
          </h1>
          <h2 className="text-lg lg:text-xl font-medium">
            Partial colletions about Hollywood stars and kolossal or cult
            movies. Discover the world's most known halls. These lists will be
            updated soon...
          </h2>
          <div className="flex flex-col-reverse lg:flex-row lg:justify-center w-full lg:w-max gap-2 mt-2">
            <Link to={"/movies"} className="block w-full">
              <Button size={"lg"} variant={"secondary"} className='w-full'>
                View all movie
              </Button>
            </Link>
            <Link to={"/actors"} className="block w-full">
              <Button size={"lg"} className='w-full'>View all actors</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
