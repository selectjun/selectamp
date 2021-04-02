import { createAction, handleActions } from 'redux-actions';

/* ACTION TYPE */
export const SET_COMMUNITY_PAGE_MODE: string = "SET_COMMUNITY_PAGE_MODE";

/* ACTION */
export const setCommunityPageMode = createAction(SET_COMMUNITY_PAGE_MODE, (mode: PageModeType) => mode);

/* ACTION FLOW TYPE */
type SetCommunityPageModeType = ReturnType<typeof setCommunityPageMode>;

/* STATE TYPE */
export type PageModeType = "list" | "view";

type InitialStateType = {
  mode: PageModeType
};

/* INITIAL STATE */
const initialState: InitialStateType = {
  mode: "list"
};

/* REDUCER TYPE */
export type ConfigType = ReturnType<typeof reducer>;

/* REDUCER */
const reducer = handleActions({
  [SET_COMMUNITY_PAGE_MODE]: (state, action: SetCommunityPageModeType) => {
    return {
      ...state,
      mode: action.payload
    };
  }
}, initialState);

export default reducer;