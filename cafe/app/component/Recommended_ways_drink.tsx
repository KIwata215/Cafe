interface Recommended_ways_drink_Props {
    recommeded_drink: string[]; // おすすめの飲み方（配列）
  }
  
  export default function Recommended_ways_drink({
    recommeded_drink,
  }: Recommended_ways_drink_Props) {
    return (
      <div className="relative border border-black w-full h-auto pb-6 mt-10">
        {/* 番号表示 */}
        <div
          className="absolute top-[-25px] left-[10px] bg-customOrage text-white
              w-[35px] h-[35px] flex items-center justify-center text-[16px] shadow-md"
        >
          6
        </div>
  
        {/* タイトル部分 */}
        <div className="text-center mt-2">
          <span
            className="relative after:content-[''] after:absolute after:left-[-10px] 
                  after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[20px]"
          >
            Recommended ways to drink
          </span>
        </div>
  
        {/* 内容部分 */}
        <div className="mt-4 px-4 ml-6">
          {recommeded_drink.length > 0 ? (
            <ul className="list-disc ml-6">
              {recommeded_drink.map((method, index) => (
                <li key={index} className="text-[14px] mb-1">
                  {method}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] text-gray-500 text-center">
              おすすめの飲み方はありません。
            </p>
          )}
        </div>
      </div>
    );
  }