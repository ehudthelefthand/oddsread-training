export async function signup(user) {
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (e) {
    onError(e);
  }
};

export async function signin(user) {
  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (e) {
    onError(e);
  }
};

export async function session() {
  try {
    const response = await fetch('/session', { credentials: 'same-origin' });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (e) {
    onError(e);
  }
}

export async function signout() {
  try {
    const response = await fetch('/signout', {
      method: 'POST',
      credentials: 'same-origin'
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
  } catch (e) {
    onError(e);
  }
}


export async function createBook(book) {
  const payload = makeFormData(book);
  try {
    const response = await fetch('/books', {
      method: 'POST',
      body: payload,
      credentials: 'same-origin'
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (e) {
    onError(e);
  }
}

export async function deleteBook(id) {
  try {
    const response = await fetch(`/books/${id}`, {
      method: 'POST',
      credentials: 'same-origin'
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
  } catch (e) {
    onError(e);
  }
}

export async function listBook() {
  try {
    const response = await fetch('/books', {
      credentials: 'same-origin'
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (e) {
    onError(e);
  }
};

export async function addRead(book) {
  try {
    const response = await fetch('/reads', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: book._id })
    });
    return await response.json();
  } catch (e) {
    onError(e);
  }
}

export async function listRead() {
  try {
    const response = await fetch('/reads', {
      credentials: 'same-origin'
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (e) {
    onError(e);
  }
};

export async function removeRead(book) {
  try {
    const response = await fetch(`/reads/${book._id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    });
    if (response.status !== 200) {
      throw new Error(response.error);
    }
  } catch (e) {
    onError(e);
  }
}

function onError(e) {
  console.error(e);
  throw new Error('Oops! Something goes wrong');
}

function makeFormData(data) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
}