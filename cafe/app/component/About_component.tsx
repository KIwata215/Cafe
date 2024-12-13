interface About_component_Props{
    about:string;

}
export default function About_component({about}:About_component_Props){
    return(
      <div className="flex justify-center items-center p-1 relative">
        {/* 枠 */}
        <div className="border border-black w-[360px] h-auto relative  ml-5 mr-5 p-4">
          {/* 左上に被る正方形 */}
          <div
            className="absolute top-[-25px] left-[10px] bg-customOrage text-white 
            w-[35px] h-[35px] flex items-center justify-center text-[16px] shadow-md"
          >
            1
          </div>
          {/* ABOUT の配置 */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 text-center">
            <span className="relative after:content-[''] after:absolute after:left-[-10px] after:right-[-10px] after:bottom-[-2px] after:h-[2px] after:bg-customOrage text-[20px]">
              ABOUT
            </span>
          </div>
          {/* about テキスト */}
          <div className="mt-10 text-left text-[14px]">{about}</div>
        </div>
      </div>
    );
}