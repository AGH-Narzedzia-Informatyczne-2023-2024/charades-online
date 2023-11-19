interface DotProps {
    index: number,
    activeDot: number,
    onClick: (index:number) => void
}

function Dot({index, activeDot, onClick} : DotProps) {
    const active = activeDot == index;

    function setActive(index:number) {
        onClick(index);
    }

    return (
        <div className={`flex bg-white w-5 h-5 m-3 rounded-full cursor-pointer items-center transition ease-in-out delay-10 hover:opacity-100 ${active ? "opacity-100" : "opacity-30"}`} onClick={() => setActive(index)}>
            
        </div>
    )
}

export default Dot