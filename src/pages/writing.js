import React from "react"
import Layout from "../components/layout"
import usePosts from "../hooks/use-posts"
import PostPreview from "../components/post-preview"

export default () => {
  const posts = usePosts()
  return (
    <>
      <Layout>
        <div class="page-wrapper writing-wrapper">
          <h1 class="page-title writing-title">Writing</h1>
          <hr class="writing-hr" />
          <h4></h4>
          {posts.map(post => {
            return <PostPreview key={post.slug} post={post} />
          })}
        </div>
      </Layout>
    </>
  )
}
