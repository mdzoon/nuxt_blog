<template>
    <client-only>
        <div class="error-page">
            <h1>Oops, something went wrong!</h1>
            <div>Back to <a href="/">safety</a>!</div>
        </div>    
    </client-only>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>