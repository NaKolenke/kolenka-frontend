<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div class="column">
        
        <h2>Новый блог</h2>
        <div class="form-horizontal">
          
          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="title">Название</label>
            </div>
            <div class="col-9 col-sm-12">
              <input 
                class="form-input" 
                type="text" 
                id="title"
              />
              <p class="form-input-hint">/blogs/</p>
            </div>
          </div>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="description">Описание</label>
            </div>
            <div class="col-9 col-sm-12">
              <textarea 
                class="form-input" 
                type="text" 
                id="description"
                maxlength="250"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="type">Тип блога</label>
            </div>
            <div class="col-9 col-sm-12">
              <select class="form-select">
                <option>Публичный (вступать и писать могут все)</option>
                <option>Закрытый (вступать и писать могут только по приглашениям)</option>
                <option>Скрытый</option>
              </select>
            </div>
          </div>

          <div class="form-group float-right">
            <div class="btn-group btn-group-block" style="width:350px">
              <div class="loading" style="margin-right: 32px"></div>
              <input type="submit" class="btn btn-primary" value="Создать">
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="bottom-padd"></div>
  </div>
</template>