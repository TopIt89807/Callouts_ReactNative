import { userSaga } from './user'
import { followSaga } from './follow'
import { postSaga } from './post'
import { globalSaga } from './global'

export default [
    userSaga,
    followSaga,
    postSaga,
    globalSaga,
]