import { userSaga } from './user'
import { followSaga } from './follow'
import { globalSaga } from './global'

export default [
    userSaga,
    followSaga,
    globalSaga,
]