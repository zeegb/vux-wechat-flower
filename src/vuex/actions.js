/**
 * Created by wangze on 2016/10/18.
 */
export const setLoadingState = ({dispatch}, status) => {
  dispatch('UPDATE_LOADING', status)
}
