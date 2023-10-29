const listHelper = require('../utils/list_helper')
const {listWithOneblog, initialBlogs} = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
      expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the like of that', () => {
      expect(listHelper.totalLikes(listWithOneblog)).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
      expect(listHelper.totalLikes(initialBlogs)).toBe(36)
    })
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog that is the favorite', () => {
    const expectedResult = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    expect(listHelper.favoriteBlog(listWithOneblog)).toEqual(expectedResult)
  })

  test('when list has many blogs calculates most liked blog', () => {
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }
    expect(listHelper.favoriteBlog(initialBlogs)).toEqual(expectedResult)
  })
})

describe('mostBlogs', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when list has only one blogs that is author with most blogs', () => {
    const expectedResult = {author: 'Edsger W. Dijkstra', blogs: 1}
    expect(listHelper.mostBlogs(listWithOneblog)).toEqual(expectedResult)
  })

  test('when list has many blogs calculates right', () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(listHelper.mostBlogs(initialBlogs)).toEqual(expectedResult)
  })
})

describe('mostLikes', () => {
  test('of empty list is empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when list has only one blog that is author with most likes', () => {
    const expectedResult = { author: 'Edsger W. Dijkstra', likes: 5}
    expect(listHelper.mostLikes(listWithOneblog)).toEqual(expectedResult)
  })

  test('when list has many blogs calculates right most likes', () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(listHelper.mostLikes(initialBlogs)).toEqual(expectedResult)
  })
})