<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem class="link">{{$route.meta.title}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<style scoped>
    .ivu-breadcrumb {
        height: 10px;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        line-height: 5px;
    }
    .link{
        border-left: 3px #31c17b solid;
        padding-left: 10px;
    }
</style>