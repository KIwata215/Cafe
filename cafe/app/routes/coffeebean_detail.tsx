import { json, useLoaderData } from "@remix-run/react";
import { supabase } from "lib/supabase";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { CoffeebeanDBResponse } from "domain/Coffeebeans";
import About_component from "~/component/about_component";
import Variety_component from "~/component/Variety_component";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;

  if (!title) {
    throw new Response("Title is required", { status: 400 });
  }

  // リダイレクトで title を渡す
  return redirect(`/coffeebean_detail?title=${encodeURIComponent(title)}`);
};

//loader
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  if (!title) {
    throw new Response("Title is missing", { status: 400 });
  }

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
      flavor_text,
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
      ),
      variety(
        variety_type_id(
          variety_type
        )
      )
    `)
    .eq("title", title);
    
  if (error) {
    console.error("Error fetching coffeebeans:", error.message);
    throw new Response("Failed to fetch data from Supabase", { status: 500 });
  }
// Supabaseのレスポンスデータを確認
console.log("Supabase response data:", JSON.stringify(data, null, 2));
  return json({ coffeebeans: data });
};

export default function CoffeebeansDetail() {
  const { coffeebeans } = useLoaderData() as { coffeebeans: CoffeebeanDBResponse[] };

  return (
    <div className="bg-customWhite/85">
      {coffeebeans.length === 0 ? (
        <p>No coffee beans found for the given title.</p>
      ) : (
        <div>
          {coffeebeans.map((bean) => (
            console.log(bean.variety),
            <div key={bean.id} className="block bg-customWhite">
              <div
              className="relative w-full aspect-[3/2] overflow-hidden"
              >
                {/* 画像 */}
                <img
                  src={bean.image_url}
                  alt={bean.title}
                  className="w-full h-full object-cover"
                />
                {/* テキスト */}
                <div className="absolute inset-0 flex items-center justify-">
                  <h2 className="text-white text-xl  underline  underline-offset-8  ">{bean.title}</h2>
                </div>
                {/* 三角形 */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-0 
                  border-l-transparent border-r-[100vw] border-r-transparent border-b-[100px] 
                  border-b-customWhite/95"
                >
                </div>
              </div>
              <About_component about={bean.about}/>
              
              <div className ="flex mt-6 ">
                <Variety_component 
                  variety=
                    {bean.variety?.map((variety: { variety_type_id: { variety_type: unknown; }; }) => {
                        return variety.variety_type_id.variety_type;
                      })
                    }
                />
              </div>

            </div> 
          ))}
        </div>
      )}
    </div>
    // <div>
    //   <h1>Coffee Beans Detail</h1>
    //   {coffeebeans.length === 0 ? (
    //     <p>No coffee beans found for the given title.</p>
    //   ) : (
    //     <ul>
    //       {coffeebeans.map((bean) => (
    //         <li key={bean.id}>
    //           <h2>{bean.title}</h2>
    //           <p>{bean.about}</p>
    //           <img src={bean.image_url} alt={bean.title} style={{ width: "200px" }} />
    //           <p>
    //             <strong>Sweetness:</strong> {bean.sweetness} | <strong>Bitterness:</strong> {bean.bitterness}
    //           </p>
    //           <p>
    //             <strong>Sourness:</strong> {bean.sourness} | <strong>Richness:</strong> {bean.richness} |{" "}
    //             <strong>Aroma:</strong> {bean.aroma}
    //           </p>
    //           <p>
    //             <strong>Roast Level:</strong> {bean.roast_level?.name}
    //           </p>
    //           <p>
    //             <strong>Recommended Drinks:</strong>{" "}
    //             {bean.recommeded_drink?.map((drink) => drink.recommeded_drink_id.drink_method).join(", ")}
    //           </p>
    //           <p>
    //             <strong>Flavors:</strong>{" "}
    //             {bean.flavor?.map((flavor) => flavor.flavor_id.flavor_type).join(", ")}
    //           </p>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
}