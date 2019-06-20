const Portfolio = function() {
	function makeWords() {
		var words = [
			{
				text: "PYTHON | Flask",
				weight: 12.3
			}, {
				text: " PHP",
				weight: 8
			}, {
				text: "javascript",
				weight: 14
			}, {
				text: "HTML 5",
				weight: 3
			}, {
				text: "Git GitHub, IoT",
				weight: 7
			}, {
				text: "CSS",
				weight: 10
			}, {
				text: "java",
				weight: 9
			}, {
				text: "SQL, R ",
				weight: 15
			}, {
				text: "XML, C++",
				weight: 7
			}, {
				text: "RDBMS",
				weight: 10
			}
		];
		return words;
	}

	function makeWordCloud(words) {
		$('.teaching-domains').jQCloud(words, {delay: 120});
	}

	function displayWordCloud() {
		var count = 1;
		$(window).on('scroll', function() {
			var y_scroll_pos = window.pageYOffset;
			var scroll_pos_test = 2700; // set to whatever you want it to be
			var words = makeWords();
			if (y_scroll_pos > scroll_pos_test && count <= 1) {
				makeWordCloud(words);
				count++;
			}
		});
	}

	function designForm() {
		$("#my-modal form").addClass("my-form");
	}

	function typeAnimation() {
		Typed.new("#writing-text", {
			strings: [
				"am a Full-Stack Web Developer.", "love everything about code.", "solve problems."
			],
			// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
			stringsElement: null,
			// typing speed
			typeSpeed: 1,
			contentType: 'text',
			callback: function() {
				$("#writing-text").css({"color": "#fff", "background-color": "#C8412B"});
			},
			preStringTyped: function() {},
			onStringTyped: function() {}
		});
	}

	return {
		displayWordCloud: displayWordCloud,
		typeAnimation: typeAnimation
	}

}();


Portfolio.displayWordCloud();
Portfolio.typeAnimation();
