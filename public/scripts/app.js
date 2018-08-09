$(function () {

  $('#dialog').dialog({autoOpen: false})

  $('#sortable').sortable({
    start: (event, ui) => {
      ui.item.data('originIndex', ui.item.index())
    },
    change: (event, ui) => {
      var originIndex = ui.item.data('originIndex')
      var currentIndex = ui.placeholder.index()
      if (currentIndex > originIndex) {
        currentIndex -= 1
      }
    },
    stop: (event, ui) => {
    },
    update: function (event, ui) {
      let order = $(this).sortable('toArray')
      let data = []
      let pos = 0
      for (_id of order) {
        data.push({id: _id, position: pos})
        pos++
      }

      $.ajax({
        data: JSON.stringify(order),
        method: 'POST',
        url: '/items/order',
        contentType: 'application/json',
        type: 'json',
        success: (item) => {
          console.log('ok order')
        },
        error: () => {
          alert('Error')
        }
      })
    }
  })

  var _URL = window.URL || window.webkitURL

  function insertItem (item) {
    $('#sortable').append(
      `<div class="row custom-1" id="${item._id}">
          <div class="col-4">
            <img src="/uploads/${item.fileName}" width="200px" height="200px"/>
          </div>
          <div id="itemDescription" class="col-6 custom-description">
            ${item.description}
          </div>
          <div class="col-2 custom-description"">
             <!--<button type="submit" class="btn btn-info" id="edit" onclick="editItem('${item._id}')">Edit</button>-->
             <button type="submit" class="btn btn-info" id="delete"  onclick="deleteItem('${item._id}')">Delete</button>
          </div>
        </div>`)

    let counter = Number($('#counter').val()) + 1
    $('#counter').val(counter)
  }

  function getItems () {
    $.get('/items', (data) => {
      for (item of data) {
        insertItem(item)
      }
    })
  }

  getItems()

  $('#addItemForm').submit((event) => {
    event.preventDefault()

    let data = new FormData($('#addItemForm')[0])

    $.ajax({
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST',
      url: '/item',
      success: (item) => {
        $('#closeModal').trigger('click')
        insertItem(item)
      },
      error: () => {
        alert('Error')
      }
    })
  })

  $('#addItem').click(() => {
    $('#ex1').dialog()
  })

  $('#inputFile').change(function () {
    var file = $(this)[0].files[0]

    img = new Image()
    let imgwidth = 0
    let imgheight = 0
    let maxwidth = 350
    let maxheight = 350

    img.src = _URL.createObjectURL(file)
    img.onload = function () {
      imgwidth = this.width
      imgheight = this.height

      if (imgwidth <= maxwidth && imgheight <= maxheight) {
      } else {
        alert('Image should be <= 320px x 320px')
        $('#inputFile').val('')
        return
      }
    }
    img.onerror = function () {
      $('#response').text('not a valid file: ' + file.type)
    }
  })

})

function deleteItem (id) {
  $.ajax({
    method: 'DELETE',
    url: `/items/${id}`,
    contentType: 'application/json',
    type: 'json',
    success: () => {
      $(`#${id}`).remove()

      let counter = Number($('#counter').val()) - 1
      $('#counter').val(counter)
    },
    error: () => {
      alert('Error')
    }
  })
}

function editItem (id) {
  let description = $(`#${id} > #itemDescription`).text().trim()
}



