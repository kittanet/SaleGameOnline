$(document).ready(function() {
    $('.delete-game').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/api/game/' + id,
            success: function(response) {
                alert('Reject Invoice');
                window.location.href = '/game/list';
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});