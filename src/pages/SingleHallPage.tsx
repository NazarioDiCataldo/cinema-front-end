import AvatarsList from "@/components/AvatarsList";
import { Button } from "@/components/ui/button";
import DeleteResource from "@/components/ui/DeleteResource";
import { Skeleton } from "@/components/ui/skeleton";
import { Hall, type HallType } from "@/lib/Hall";
import type { ProjectionType } from "@/lib/Projection";
import { ArrowLeft, Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const SingleHallPage = () => {
  const params = useParams();
  const [hall, setHall] = useState<HallType>();
  const [projections, setProjections] = useState<ProjectionType[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    Hall.single(params.id!)
      .then((hall) => setHall(hall))
      .catch(() => navigate("/Halls"));

    //Get dei film collegati all'attore
    Hall.projections(params.id!).then((projections) => setProjections(projections));
  }, [params.id]);

  if (!hall) {
    return (
      <main className="container">
        <section className="flex  flex-wrap lg:flex-nowrap gap-8">
          <Skeleton className="h-100 w-1/2 bg-gray-500" />
          <div className="w-1/2 flex flex-col gap-4">
            <Skeleton className="h-16 bg-gray-500" />
            <Skeleton className="h-12 bg-gray-500" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <Link className="text-primary underline w-max flex gap-1 items-center" to={'/halls'}>
        <ArrowLeft className="size-5" />
        Return to halls
      </Link>
      <section className="flex gap-8">
        <picture className="w-1/2 aspect-square">
          <img
            className="w-full h-full object-cover"
            src={hall.image_path}
            alt={`Portrait about ${hall.name}`}
          />
        </picture>
        <aside className="w-1/2 flex flex-col gap-4 pt-4">
          <h1 className="text-4xl text-primary font-semibold">{Hall.name}</h1>
          <p>
            <strong>City</strong>: {hall.city}
          </p>
          <p>
            <strong>Places</strong>: {hall.places}
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <DeleteResource
              trigger={
                <Button size={"lg"} variant={"destructive"}>
                  <Trash2 />
                  Delete
                </Button>
              }
            />
            <Link to={`/halls/${hall.id}/update`}>
              <Button
                size={"lg"}
                variant={"outline"}
                className={"w-max shadow-xl"}
              >
                <Pen />
                Edit Hall
              </Button>
            </Link>
          </div>
          {projections.length > 0 && <AvatarsList title="Last projections" list={projections} route={'projections'} />}
        </aside>
      </section>
    </main>
  );
};

export default SingleHallPage;
