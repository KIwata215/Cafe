import { json, useLoaderData } from "@remix-run/react";
import { supabase } from "lib/supabase";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { CoffeebeanDBResponse } from "domain/Coffeebeans";
import About_component from "~/component/about_component";
import Variety_component from "~/component/Variety_component";
import gazou from "public/コーヒー豆画像1.png";
import gazou2 from "public/コーヒー豆画像２.png";
import Roast_component from "~/component/Roast_component";
import Flavor_component from "~/component/Flavor_component";
import Taste_component from "~/component/Taste_component";
import Recommended_ways_drink from "~/component/Recommended_ways_drink";

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
      sweetness,
      bitterness,
      sourness,
      richness,
      aroma,
      flavor_text,
      roast(
        roast_level(
          name
        )
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
                  <h2 className="text-white text-[26px]  underline  underline-offset-8  ">{bean.title}</h2>
                </div>
                {/* 三角形 */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-0 
                  border-l-transparent border-r-[100vw] border-r-transparent border-b-[100px] 
                  border-b-customWhite/95"
                >
                </div>
              </div>
              <div>
                {/*Aboutコンポーネント呼び出し*/}
                <About_component about={bean.about}/>
                <div className ="flex mt-10 ">
                  <div>
                    {/*Varietyコンポーネント呼び出し*/}
                    <Variety_component 
                      variety=
                        {bean.variety?.map((variety: { variety_type_id: { variety_type: unknown; }; }) => {
                            return variety.variety_type_id.variety_type;
                          })
                        }
                    />
                    {/*Flavorコンポーネント呼び出し*/}
                    <Flavor_component 
                      flavor_type={bean.flavor?.map((flavor) => flavor.flavor_id.flavor_type) } 
                      flavor_text={bean.flavor_text}                  
                    />
                  </div>
                  {/*画像表示とRoastコンポーネント表示*/ }
                  <div className=" flex flex-col items-center w-[175px] h-auto ml-3 mr-5">
                    <img
                    className="h-auto w-auto -mt-6"
                      src={gazou}
                      alt=""
                    />
                    {/* ROASTコンポーネント呼び出し*/}
                    <div className="h-auto mr-5">
                      <Roast_component Roast_level={"シナモンロースト"} Roast_time={15} Roast_temperature={180}                    />
                    </div>
                    <img
                      className="h-auto w-auto mt-2"
                      src={gazou2}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mr-3 ml-3">
                  <Taste_component 
                    sweetness={bean.sweetness} 
                    bitterness={bean.bitterness} 
                    sourness={bean.sourness} 
                    richness={bean.richness} 
                    aroma={bean.aroma}
                  />
                </div>
                <div className="mr-3 ml-3 relative">
                {/* Recommended_ways_drink コンポーネント */}
                <Recommended_ways_drink
                  recommeded_drink={
                    bean.recommeded_drink?.map((drink) => drink.recommeded_drink_id.drink_method)
                  }
                />
                </div>
                {/* 三角形とその下の要素を管理 */}
                <div className="relative mt-10">
                  {/* 三角形の要素 */}
                  <div
                    className="bottom-0 left-0 w-0 h-0 
                  border-l-transparent border-r-[100vw] border-r-transparent border-b-[100px] 
                      border-b-customBlack/85"
                  ></div>
                  {/* お店の情報 */}
                  <div className="bg-customBlack/85 w-full text-center text-white pb-10">
                    {/* タイトル部分 */}
                    <div className="text-center ">
                      <span
                        className="relative after:content-[''] after:absolute after:left-[-10px] 
                              after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[30px]"
                      >
                        お店の情報
                      </span>
                    </div>
                    {/*ここにお店の詳細情報を表示*/}
                    <div className="flex justify-center mt-10">
                      <div className="w-[300px] h-[300px] bg-slate-300"></div>
                    </div>
                    <div className="flex flex-col items-center mt-10 space-y-4 text-[24px]">
                      {/* 開店時間 */}
                      <div>開店時間</div>
                      <div>11:30~18:00</div>

                      {/* 場所 */}
                      <div>場所</div>
                      <div className="pb-10">？？？？？？？</div>
                      <div className=" border w-full border-customOrage"></div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div> 
          ))}
        </div>
      )}
    </div>
  );
}