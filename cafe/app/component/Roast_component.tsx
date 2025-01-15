interface Roast_component_Props {
    Roast_level: string;
    Roast_time: number;
    Roast_temperature: number;
  }
  
  export default function Roast_component({
    Roast_level,
    Roast_time,
    Roast_temperature,
  }: Roast_component_Props) {
    return (
      <div className="relative border border-black w-[180px] h-auto ml-6 pb-6">
        {/* 番号表示 */}
        <div
          className="absolute top-[-25px] left-[10px] bg-customOrage text-white
                  w-[35px] h-[35px] flex items-center justify-center text-[16px] shadow-md"
        >
          3
        </div>
        {/* タイトル部分 */}
        <div className="text-center mt-2">
          <span
            className="relative after:content-[''] after:absolute after:left-[-10px] after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[20px]"
          >
            ROAST
          </span>
        </div>
        {/* 内容部分 */}
        <div className="text-center mt-4 text-[13px]">
            <div>{Roast_level}</div>
            <div>焙煎時間：{Roast_time}分</div>
            <div>焙煎開始温度：{Roast_temperature}°</div>
        </div>
      </div>
    );
  }