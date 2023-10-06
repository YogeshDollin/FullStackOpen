import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = (props) => {
    const dispatch = useDispatch()

    return (
        <div>
        all <input type="radio" name="filter" onChange={_ => dispatch(filterChange('ALL'))}/>
        important <input type="radio" name="filter" onChange={_ => dispatch(filterChange('IMPORTANT'))}/>
        nonimportant <input type="radio" name="filter" onChange={_ => dispatch(filterChange('NONIMPORTANT'))}/>
      </div>
    )
}

export default VisibilityFilter