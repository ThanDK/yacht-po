/**
 * FLIPS Yacht Investment - Gallery Module
 * Handles image navigation, tab switching, and keyboard controls
 */

// ========== IMAGE DATA ==========
export const yachtData = {
    merry: {
        name: 'Merry Fisher 1095 FLY',
        tagline: 'Built for Enjoyment',
        specs: {
            length: '10.45m / 34\'3"',
            beam: '3.25m / 10\'7"',
            cabins: 3,
            power: '2×300 HP',
            fuel: '800L',
        },
        images: {
            all: [
                '/images/merry/สำเนาของ merry fisher 1095 fly no2.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no4.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no6.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no8.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no9.png',
                '/images/merry/merryfisher bedroom.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no5.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no12.png',
            ],
            exterior: [
                '/images/merry/สำเนาของ merry fisher 1095 fly no2.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no4.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no6.png',
            ],
            interior: [
                '/images/merry/merryfisher bedroom.png',
            ],
            flybridge: [
                '/images/merry/สำเนาของ merry fisher 1095 fly no8.png',
                '/images/merry/สำเนาของ merry fisher 1095 fly no9.png',
            ],
        },
    },
    camarat: {
        name: 'Cap Camarat 10.5 CC',
        tagline: 'Built for Adventure',
        specs: {
            length: '10.90m / 35\'9"',
            beam: '3.37m / 11\'1"',
            passengers: 8,
            power: '2×300 HP',
            fuel: '800L',
        },
        images: {
            all: [
                '/images/camarat/77ac1c1dc7b378bb076cf0b4c253b68f.jpg',
                '/images/camarat/3d1419f0f1dc55bcf446c7060a1e68f7.jpg',
                '/images/camarat/641c207101657dee364371efd7ab78db.jpg',
                '/images/camarat/8766d168768a4b3bad3938ae6fa5a81a.jpg',
                '/images/camarat/962db5ee9590527c95f3be29a961d9c2.jpg',
                '/images/camarat/c96173b83d8365ae5b6595c7493b499c.jpg',
                '/images/camarat/33ae4bd98ca6991d7ab2632876e1ab87.jpg',
                '/images/camarat/95ebe9151fa9e66bed139fb91da7c1b3.jpg',
                '/images/camarat/bab15785f906f7eca38a7e2a395378fa.jpg',
                '/images/camarat/cc17b76dcd540dd0d8287370a2a69b99.jpg',
            ],
            exterior: [
                '/images/camarat/77ac1c1dc7b378bb076cf0b4c253b68f.jpg',
                '/images/camarat/3d1419f0f1dc55bcf446c7060a1e68f7.jpg',
                '/images/camarat/641c207101657dee364371efd7ab78db.jpg',
            ],
            deck: [
                '/images/camarat/8766d168768a4b3bad3938ae6fa5a81a.jpg',
                '/images/camarat/c96173b83d8365ae5b6595c7493b499c.jpg',
            ],
            lifestyle: [
                '/images/camarat/962db5ee9590527c95f3be29a961d9c2.jpg',
                '/images/camarat/33ae4bd98ca6991d7ab2632876e1ab87.jpg',
            ],
        },
    },
};

// ========== GALLERY CLASS ==========
export class YachtGallery {
    constructor(yachtKey, containerId) {
        this.yachtKey = yachtKey;
        this.yacht = yachtData[yachtKey];
        this.container = document.getElementById(containerId);
        this.currentTab = 'all';
        this.currentIndex = 0;
        this.images = this.yacht.images.all;

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Tab buttons
        this.container.querySelectorAll('.gallery-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Navigation arrows
        this.container.querySelector('.nav-prev')?.addEventListener('click', () => this.prev());
        this.container.querySelector('.nav-next')?.addEventListener('click', () => this.next());

        // Thumbnail clicks
        this.container.querySelectorAll('.thumb-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.goTo(index));
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        this.images = this.yacht.images[tab] || this.yacht.images.all;
        this.currentIndex = 0;
        this.updateUI();
        this.updateTabs();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateUI();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateUI();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateUI();
    }

    updateUI() {
        // Update featured image with fade
        const featured = this.container.querySelector('.featured-img');
        if (featured) {
            featured.style.opacity = '0';
            setTimeout(() => {
                featured.src = this.images[this.currentIndex];
                featured.style.opacity = '1';
            }, 150);
        }

        // Update counter
        const counter = this.container.querySelector('.img-counter');
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }

        // Update thumbnail highlights
        this.container.querySelectorAll('.thumb-btn').forEach((btn, i) => {
            if (i === this.currentIndex) {
                btn.classList.add('ring-2', 'ring-ocean-500', 'ring-offset-2');
                btn.classList.remove('opacity-60');
            } else {
                btn.classList.remove('ring-2', 'ring-ocean-500', 'ring-offset-2');
                btn.classList.add('opacity-60');
            }
        });
    }

    updateTabs() {
        this.container.querySelectorAll('.gallery-tab').forEach(btn => {
            const tab = btn.dataset.tab;
            if (tab === this.currentTab) {
                btn.classList.add('active', 'bg-navy-700', 'text-white');
                btn.classList.remove('bg-gray-100', 'text-gray-600');
            } else {
                btn.classList.remove('active', 'bg-navy-700', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-600');
            }
        });
    }
}

// ========== KEYBOARD NAVIGATION ==========
export function initKeyboardNav(galleries) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            galleries.forEach(g => g.next());
        } else if (e.key === 'ArrowLeft') {
            galleries.forEach(g => g.prev());
        }
    });
}
