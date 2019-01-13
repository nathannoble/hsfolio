const schoolInitialState = {
    isLoading: true,
    currentSchool: {},
    currentSchoolYear: {},
    currentStudent: null,
    schoolList: []
}

const school = (state = schoolInitialState, action) => {
    switch (action.type) {
        case 'INIT_SCHOOL_LIST':
            return { ...state, schoolList: action.schoolList, isLoading: false }

        // Update the current school and the corresponding item
        case 'SET_SCHOOL':
            return { ...state, currentSchool: action.school, currentSchoolYear: {} }

        case 'SET_SCHOOL_YEAR':
            return { ...state, currentSchoolYear: action.schoolYear }

        case 'SET_STUDENT':
            return { ...state, currentStudent: action.student }

        default:
            return state
    }
}

export default school