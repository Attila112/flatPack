function Pagination(props) {
  const createElements = (num) => {
    const elements = [];
    for (let i = 1; i <= num; i++) {
      elements.push(
        <button
          className="min-w-9 rounded-md bg-slate-800 py-2 px-3 bg-cyan-500 border border-transparent text-center text-sm text-black transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          value={i}
          onClick={() => props.changePage(i)}
          key={i}
        >
          {i}
        </button>
      );
    }
    return elements;
  };
  const pagePrev = () => {
    if (props.page - 1 > 0) {
      return props.page - 1;
    } else {
      return props.page;
    }
  };
  const pageNext = () => {
    if (props.page + 1 <= props.pageNumber) {
      return props.page + 1;
    } else {
      return props.page;
    }
  };
  return (
    <div className="flex space-x-1 justify-center color-black">
      {props.page > 1 ? (
        <button
          className="rounded-md bg-cyan-500 border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          onClick={(e) => props.changePage(pagePrev())}
        >
          Prev
        </button>
      ) : (
        ""
      )}
      {createElements(props.pageNumber)}
      {props.page + 1 <= props.pageNumber ? (
        <button
          className="min-w-9 rounded-md bg-cyan-500 border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          onClick={(e) => props.changePage(pageNext())}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Pagination;
