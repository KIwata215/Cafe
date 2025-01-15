interface Variety_component_Props{
    variety:string[];
}
export default function Variety_component({variety}:Variety_component_Props){
    return(
        <div className="relative border border-black w-[180px] h-[150px] ml-3">
            <div className="absolute top-[-25px] left-[10px] bg-customOrage text-white 
            w-[35px] h-[35px] flex items-center justify-center text-[16px] shadow-md">
                2
            </div>
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 text-center">
                <span className="relative after:content-[''] after:absolute after:left-[-10px] after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[20px]">
                VARIETY
                </span>
            </div>
            <div className="mt-12 ml-3 mr-3 text-[13px]">
                {/*取得してきたデータを配列に変換*/}
                {variety && variety.length > 0 ? (
                    variety.map((item, index) => (
                    <div key={index} className=" text-left before:content-['・'] before:mr-2">
                        {item}
                        
                    </div>
                    ))
                ) : (
                    //データがない場合
                    <>
                    </>
                )}
            </div>
        </div>
    )
}