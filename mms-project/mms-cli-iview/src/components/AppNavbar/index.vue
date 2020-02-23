<template>
    <div class="navbar">
        <Menu theme="dark" active-name="home">
            <MenuItem to="/home/" name="home">
                <Icon type="md-home" />
                首页
            </MenuItem>
            <MenuItem to="/member/" name="member">
                <Icon type="ios-man" />
                会员管理
            </MenuItem>
            <MenuItem to="/supplier/" name="supplier">
                <Icon type="md-people" />
                供应商管理
            </MenuItem>
            <MenuItem to="/goods/" name="goods">
                <Icon type="ios-cog-outline" />
                商品管理
            </MenuItem>
            <MenuItem to="/staff/" name="staff">
                <Icon type="ios-man-outline" />
                员工管理
            </MenuItem>
        </Menu>
    </div>
</template>