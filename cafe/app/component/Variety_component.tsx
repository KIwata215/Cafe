interface Variety_component_Props{
    variety:string[];
}
export default function Variety_component({variety}:Variety_component_Props){
    return(
        <div className="border border-black w-[180px] h-auto ml-6 ">
            <div className=" m-4">
            <p>
                
                {variety}
                </p>
            </div>
        </div>
    )
}