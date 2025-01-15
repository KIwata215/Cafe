import filled_bean from "public/Tastebean.png";
import empty_bean from "public/Taste_bean_empty.png";

interface Taste_component_Props {
    sweetness: number;
    bitterness: number;
    sourness: number;
    richness: number;
    aroma: number;
}
  
const FILLED_BEAN = filled_bean; // 色付きのコーヒー豆
const EMPTY_BEAN = empty_bean;   // 色なしのコーヒー豆

// コーヒー豆の評価の画像表示関数
const renderBeans = (rating: number) => {
    const filledBeans = Array(rating).fill(FILLED_BEAN);       // 色付きの画像
    const emptyBeans = Array(5 - rating).fill(EMPTY_BEAN);     // 色なしの画像

    return (
        <div className="flex">
        {filledBeans.map((bean, index) => (
            <img
            key={`filled-${index}`}
            src={bean}
            alt="Filled Bean"
            className="w-7 h-6 mr-1"
            />
        ))}
        {emptyBeans.map((bean, index) => (
            <img
            key={`empty-${index}`}
            src={bean}
            alt="Empty Bean"
            className="w-7 h-6 mr-1"
            />
        ))}
        </div>
    );
};

export default function Taste_component({sweetness,bitterness,sourness,richness,aroma}:Taste_component_Props){
    return(
        <div className="relative border border-black w-full h-auto pb-6 mt-10">
            {/* 番号表示 */}
            <div
            className="absolute top-[-25px] left-[10px] bg-customOrage text-white
                w-[35px] h-[35px] flex items-center justify-center text-[16px] shadow-md"
            >
            5
            </div>
            {/* タイトル部分 */}
            <div className="text-center mt-2">
                <span
                    className="relative after:content-[''] after:absolute after:left-[-10px] 
                    after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[20px]"
                >
                    TASTE
                </span>
            </div>

            {/* 内容部分 */}
            <div className="flex flex-col mt-5  ">
                {/*苦味*/}
                <div className="flex justify-center mb-2">
                    <div className="text-[15px]">
                        ・苦味
                    </div>
                    <div className=" ml-8">
                    {renderBeans(bitterness)}
                    </div>
                </div>
                {/*酸味*/}
                <div className="flex justify-center mb-2">
                    <div className="text-[15px]">
                        ・酸味
                    </div>
                    <div className=" ml-8">
                    {renderBeans(sourness)}
                    </div>
                </div>
                {/*コク*/}
                <div>
                <div className="flex justify-center mb-2">
                    <div className="text-[15px]">
                        ・コク
                    </div>
                    <div className=" ml-8">
                    {renderBeans(richness)}
                    </div>
                </div>
                </div>
                {/*甘み*/}
                <div className="flex justify-center mb-2">
                    <div className="text-[15px]">
                        ・甘み
                    </div>
                    <div className=" ml-8">
                    {renderBeans(sweetness)}
                    </div>
                </div>
                {/*香り*/}
                <div className="flex justify-center mb-2">
                    <div className="text-[15px]">
                        ・香り
                    </div>
                    <div className=" ml-8">
                    {renderBeans(aroma)}
                    </div>
                </div>
            </div>
        </div>
    );
}