// gallery.js
(function () {
    const leftTrack = document.querySelector(".left-gallery .gallery-track");
    const rightTrack = document.querySelector(".right-gallery .gallery-track");
  
    if (!leftTrack || !rightTrack) return; // 갤러리가 없는 페이지는 실행 안 함
  
    const gallerySpeed = 0.5; // 픽셀 단위 속도 (조절 가능)
  
    // 저장된 위치 불러오기
    let savedOffset = parseFloat(localStorage.getItem("galleryOffset")) || 0;
    let savedTime = parseInt(localStorage.getItem("galleryTime")) || Date.now();
  
    // 시간 차이만큼 보정
    let elapsed = (Date.now() - savedTime) * gallerySpeed / 16;
    let offsetY = (savedOffset - elapsed) % (leftTrack.scrollHeight / 2);
  
    function animateGallery() {
      offsetY -= gallerySpeed;
      if (Math.abs(offsetY) > leftTrack.scrollHeight / 2) {
        offsetY = 0;
      }
      leftTrack.style.transform = `translateY(${offsetY}px)`;
      rightTrack.style.transform = `translateY(${offsetY}px)`;
      requestAnimationFrame(animateGallery);
    }
    animateGallery();
  
    // 페이지 이동 전 현재 위치 저장
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("galleryOffset", offsetY);
      localStorage.setItem("galleryTime", Date.now());
    });
  })();
  