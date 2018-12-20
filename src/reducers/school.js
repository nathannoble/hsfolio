const schoolInitialState = {
    isLoading: true,
    currentSchool: {},
    schoolList: []
}

const school = (state = schoolInitialState, action) => {
    switch (action.type) {
        case 'INIT_SCHOOL_LIST':
            return { ...state, schoolList: action.schoolList, isLoading: false }

        // Update the current school and the corresponding item
        case 'SET_SCHOOL':
            return { ...state, currentSchool: action.school }

        default:
            return state
    }
}

export default school