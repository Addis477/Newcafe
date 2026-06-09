/* ============================================
   GENET RESTAURANT - COMPLETE JAVASCRIPT
   Fixed: Smooth back navigation, no refresh issues
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== FIXED: SMOOTH PAGE TRANSITIONS (No Refresh Issues) ==========
    // Store current page to prevent duplicate transitions
    let isTransitioning = false;
    let currentPageUrl = window.location.pathname.split('/').pop() || 'index.html';
    
    // Function to handle navigation with smooth transition
    function navigateTo(url) {
        if (isTransitioning) return;
        if (url === currentPageUrl) return;
        
        isTransitioning = true;
        
        // Add transition class
        const transitionOverlay = document.querySelector('.page-transition');
        if (transitionOverlay) {
            transitionOverlay.classList.add('active');
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        } else {
            window.location.href = url;
        }
    }
    
    // Handle all internal navigation links
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('tel') && !href.startsWith('mailto') && !href.startsWith('javascript')) {
            // Skip WhatsApp button
            if (!link.classList.contains('whatsapp-float')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigateTo(href);
                });
            }
        }
    });
    
    // Remove transition overlay when page loads
    const transitionOverlay = document.querySelector('.page-transition');
    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 100);
    }
    
    // Fix for browser back/forward buttons - remove transition overlay
    window.addEventListener('pageshow', function() {
        if (transitionOverlay) {
            transitionOverlay.classList.remove('active');
        }
        isTransitioning = false;
        currentPageUrl = window.location.pathname.split('/').pop() || 'index.html';
    });
    
    // ========== AOS INITIALIZATION ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-in-out' });
    }
    
    // ========== MOBILE SIDEBAR ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== TOAST NOTIFICATION ==========
    window.showToast = function(message, duration = 2500) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    };
    
    // ========== ACTIVE NAVIGATION ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== CONTACT FORM ==========
    const sendContactBtn = document.getElementById('sendContactBtn');
    if (sendContactBtn) {
        sendContactBtn.addEventListener('click', function() {
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('contactMsg')?.value.trim();
            
            if (!name || !email || !message) {
                showToast('⚠️ Please fill all fields');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('⚠️ Please enter a valid email address');
                return;
            }
            
            showToast('✓ Message sent! We\'ll reply within 24 hours.');
            
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
        });
    }
    
    console.log('GENET RESTAURANT - Website loaded successfully!');
});
