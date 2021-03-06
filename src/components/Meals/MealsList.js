import style from "./MealsList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";

export default function MealsList() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodorder-afd5a-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={style.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={style.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <>
      <section className={style.meals}>
        <Card>
          <li>{mealsList}</li>
        </Card>
      </section>
    </>
  );
}
