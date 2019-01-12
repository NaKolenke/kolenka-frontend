<template>
	<div class="container">
		<div class="columns">

			<div id="login" class="column col-6 col-mx-auto">
				<h1>Зарегистрироваться</h1>
				<div class="form-group">
					<label class="form-label" for="email">Email</label>
					<input class="form-input" name="email" type="email"><br/>
					<label class="form-label" for="password">Пароль</label>
					<input class="form-input" name="password" type="password"><br/>
					<button class="btn">Зарегестрироваться</button> <br/>
					<br/>
					<p>Уже есть учетная запись? <router-link to="/login">Войти</router-link></p>
				</div>
			</div>

		</div>
	</div>
</template>
