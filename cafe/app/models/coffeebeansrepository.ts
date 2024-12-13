import { json } from "@remix-run/react";
import { Coffeebeans } from "domain/Coffeebeans";
import { supabase } from "lib/supabase";

export const getCoffeebean = async (title? :string) => {
  const { data, error } = await supabase
    .from("coffeebeans")
    .select(`
      id,
      title,
      about,
      image_url,
      roast_id,
      sweetness,
      bitterness,
      sourness,
      richness,
      aroma,
      roast_level(
        name
      ),
      recommeded_drink(
        recommeded_drink_id(
          drink_method
        )
      ),
      flavor(
        flavor_id(
          flavor_type
        )
      )
    `)
    .eq("title",title)
    ;
  // データが空でない場合に変換処理を行う
  if (error) {
    console.error("Error fetching coffeebeans with roast_level:", error.message);
    throw new Response("Failed to fetch data from Supabase", { status: 500 });
  }
  console.log(
    "Fetched coffeebeans with roast_level:",
    JSON.stringify(data, null, 2)
  );

  if (!data || data.length === 0) {
    return json({ coffeebeans: [] });
  }
  // データを`Coffeebeans`インスタンスに変換
  const coffeebeansdata = data.map((dbResponse) => 
    Coffeebeans.fromDB({
      id: dbResponse.id,
      title: dbResponse.title,
      about: dbResponse.about,
      image_url: dbResponse.image_url,
      roast_id: dbResponse.roast_id,
      sweetness: dbResponse.sweetness,
      bitterness: dbResponse.bitterness,
      sourness: dbResponse.sourness,
      richness: dbResponse.richness,
      aroma: dbResponse.aroma,
      roast_level: dbResponse.roast_level,
      recommeded_drink: dbResponse.recommeded_drink,
      flavor: dbResponse.flavor,
    })
  );
  return coffeebeansdata;
};