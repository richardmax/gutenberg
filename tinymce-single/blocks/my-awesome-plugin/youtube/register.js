( function( wp ) {

	function insertEmpty() {
		return (
			'<figure>' +
				'<div class="wp-blocks-placeholder">' +
					'<svg width="48" height="48">' +
						'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../shared/gridicons.svg#gridicons-add-outline"></use>' +
					'</svg>' +
					'<p>Paste YouTube link here</p>' +
				'</div>' +
			'</figure>'
		);
	}

	function onPaste( event, block ) {
		var target = block.querySelector( 'div' );

		if ( ! target ) {
			return;
		}

		var regEx = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&]+).*/;
		var matches = regEx.exec( event.content );

		if ( matches && matches.length ) {
			target.outerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + matches[1] + '" allowfullscreen></iframe>';
		}
	}

	wp.blocks.registerBlock( {
		name: 'youtube',
		namespace: 'my-awesome-plugin',
		displayName: 'YouTube Video',
		type: 'media',
		keywords: [],
		icon: 'gridicons-video',
		editable: [ 'figcaption' ],
		controls: [
			'block-align-left',
			'block-align-center',
			'block-align-right',
			'block-align-full',
			{
				icon: 'gridicons-caption',
				onClick: function( block ) {
					var figcaption = block.querySelector( 'figcaption' );

					if ( figcaption ) {
						block.removeChild( figcaption );
					} else {
						block.insertAdjacentHTML( 'beforeend',
							'<figcaption><br></figcaption>' );
					}

					window.wp.blocks.selectBlock( block );
				},
				isActive: function( block ) {
					return !! block.querySelector( 'figcaption' );
				}
			},
			{
				icon: 'gridicons-cog',
				onClick: function() {}
			}
		],
		insert: insertEmpty,
		onPaste: onPaste
	} );

} )( window.wp );
