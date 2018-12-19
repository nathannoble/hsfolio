const schoolInitialState = {
    isLoading: true,
    currentMedia: {},
    schoolList: [],
    nowPlayingList: []
}

const school = (state = schoolInitialState, action) => {
    switch (action.type) {
        case 'INIT_SCHOOL_LIST':
            return { ...state, schoolList: action.schoolList, currentMedia: action.schoolList[0], isLoading: false }

        // Update the current school and the corresponding item
        case 'SET_CURRENT_SCHOOL':
            return { ...state, currentMedia: action.school }

        case 'SET_NOW_PLAYING_LIST':
            return { ...state, nowPlayingList: action.nowPlayingList }

        default:
            return state
    }
}

export default school