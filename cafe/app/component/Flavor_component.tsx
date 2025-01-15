interface Flavor_Props {
    flavor_type: string[]; // 配列のデータ
    flavor_text: string;   // テキストデータ
  }
  
  export default function Flavor_component({ flavor_text, flavor_type }: Flavor_Props) {
    return (
      <div className="relative border border-black w-auto h-auto ml-3 pb-6 mt-10">
        {/* 番号表示 */}
        <div
          className="absolute top-[-25px] left-[10px] bg-customOrage text-white
            w-[35px] h-[35px] flex items-center justify-center text-[16px] shadow-md"
        >
          4
        </div>
  
        {/* タイトル部分 */}
        <div className="text-center mt-2">
          <span
            className="relative after:content-[''] after:absolute after:left-[-10px] 
            after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[20px]"
          >
            FLAVOR
          </span>
        </div>
  
        {/* 内容部分 */}
        <div className="mt-4 px-4 text-[14px] text-left">
          {/* flavor_typeの表示（1行ずつ表示） */}
          {flavor_type.map((type, index) => (
            <div key={index} className="mt-1">
              ・{type}
            </div>
          ))}
        </div>
        
        {/* flavor_textの表示 */}
        <div className="mt-4 px-4 text-[12px] text-left">
          「{flavor_text}」
        </div>
      </div>
    );
  }