// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_FAV = "session/ADD_FAV";
const DELETE_FAV = "session/DELETE_FAV";


// Action creator
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const addFav = (listId, favType) => ({
	type: ADD_FAV,
	listId,
	favType
})

const deleteFav = (listId, favType) => ({
	type: DELETE_FAV,
	listId,
	favType
})


//Thunk Action Creators
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const thunkAddFav = (listId, userId, favType) => async (dispatch) => {
	const response = await fetch(
	  `/api/users/${userId}/${favType}/${listId}`,
	  {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		// body: JSON.stringify(editreview)
	  }
	)
	if (response.ok) {
	  const new_fav_playlist = await response.json()
	  dispatch(addFav(listId, favType))
	  return new_fav_playlist
	}
}

export const thunkDeleteFav = (listId, userId, favType) => async (dispatch) => {
	const response = await fetch(
	  `/api/users/${userId}/${favType}/${listId}`,
	  {
		method: "DELETE",
	  }
	)
	if (response.ok) {
	  const deleted_fav_plalist = await response.json()
	  dispatch(deleteFav(listId, favType))
	  return deleted_fav_plalist
	}
}


//Reducer
const initialState = { user: null };

export default function reducer(state = initialState, action) {
	let newState = {}
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_FAV:
			newState = {...state, user:{...state.user, [action.favType]:state.user[action.favType]}}
			newState.user[action.favType].push(action.listId);
			return newState
		case DELETE_FAV:
			newState = {...state, user:{...state.user, [action.favType]:state.user[action.favType]}}
			let index = newState.user[action.favType].indexOf(action.listId);
			console.log("what is index", index)
			newState.user[action.favType].splice(index, 1)
			return newState
		default:
			return state;
	}
}