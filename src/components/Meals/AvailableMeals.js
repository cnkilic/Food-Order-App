import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealsArray, setMealsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState();

  useEffect(() => {
    const fetchMealsData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://react-http-2668b-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        let MEALS = [];
        for (const key in data) {
          //Firebase e datayı jsonla yükledim keyler m1 m2 değildi id yoktu normalde hocanınkinde benimkinde var direk oyüzden hocanınkinde böyle bir şeye ihtiyaç var id oluşturuyo objeler için
          let arrayPushObject = { ...data[key], id: key };
          MEALS.push(arrayPushObject);
        }
        setMealsArray(MEALS);
      } catch (error) {
        setErrorState(error.message);
      }
      setIsLoading(false);
    };

    fetchMealsData();
    //Promise içerisinde try catch bu şekilde yapılıyor // yukarıdaki Try ve Catchi silince çalışıyor
    /* fetchMealsData().catch((error) => {
      setIsLoading(false);
      setErrorState(error.message);
    }); */
  }, []);

  //Error and Loading state management
  let mealsContent = <p>No meal exist</p>;

  if (mealsArray.length > 0) {
    mealsContent = mealsArray.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }
  if (errorState) {
    mealsContent = <p>{errorState}</p>;
  }
  if (isLoading === true) {
    mealsContent = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{<ul>{mealsContent}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
