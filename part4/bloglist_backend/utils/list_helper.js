const dummy = (blogs) => {
    blogs 
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (sum, currentBlog) => sum += currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.length === 0 
        ? null
        : blogs.toSorted( (blogX, blogY) => blogY.likes - blogX.likes )[0]

    return favorite ? { title: favorite.title, author: favorite.author, likes: favorite.likes } : null
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return null

    const authors = blogs.reduce( (cumulative, blog) => {
        if (cumulative[blog.author])
            cumulative[blog.author]++
        else
            cumulative[blog.author] = 1

        return cumulative
    }, {})
    console.log(authors)

    let authorWithMost = ""
    let max = 0
    for (const [ author, numOfBlogs ] of Object.entries(authors))
    {
        if (numOfBlogs > max)
        {
            max = numOfBlogs
            authorWithMost = author
        }
    }

    return { author: authorWithMost, blogs: max } 
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return null

    const authors = blogs.reduce( (cumulative, currentBlog) => {
        if (cumulative[currentBlog.author])
            cumulative[currentBlog.author] += currentBlog.likes
        else
            cumulative[currentBlog.author] = currentBlog.likes

        return cumulative
    }, {})

    let authorWithMostLikes = ""
    let maxLikes = 0
    for (const [ author, likes ] of Object.entries(authors))
    {
        if (likes > maxLikes)
        {
            maxLikes = likes
            authorWithMostLikes = author
        }
    }

    return { author: authorWithMostLikes, likes: maxLikes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}