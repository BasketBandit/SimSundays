let ws;
window.driversStore = window.driversStore || {};
window.previousPositions = window.previousPositions || {};
window.activeTelemetryDriver = window.activeTelemetryDriver || null;

// Complete Assetto Corsa EVO Official Tracks & Configurations Data
const acEvoTracks = [
    { name: "Nürburgring", layout: "Nordschleife" },
    { name: "Nürburgring", layout: "Grand Prix Circuit" },
    { name: "Circuit de Spa-Francorchamps", layout: "Grand Prix Layout" },
    { name: "Autodromo Nazionale Monza", layout: "GP Layout" },
    { name: "Autodromo Nazionale Monza", layout: "Junior Layout" },
    { name: "Autodromo Enzo e Dino Ferrari", layout: "Imola GP Layout" },
    { name: "Brands Hatch", layout: "Grand Prix Circuit" },
    { name: "Brands Hatch", layout: "Indy Circuit" },
    { name: "Mount Panorama", layout: "Bathurst Circuit" },
    { name: "WeatherTech Raceway", layout: "Laguna Seca GP" },
    { name: "Kyalami Grand Prix Circuit", layout: "GP Layout" },
    { name: "Donington Park", layout: "Grand Prix Circuit" },
    { name: "Donington Park", layout: "National Circuit" },
    { name: "Oulton Park", layout: "International GP" },
    { name: "Oulton Park", layout: "Fosters Circuit" },
    { name: "Circuit Paul Ricard", layout: "1A Full Layout" },
    { name: "Circuit Paul Ricard", layout: "1C-V2 Layout" },
    { name: "Circuit Paul Ricard", layout: "3C Short Layout" },
    { name: "Suzuka Circuit", layout: "Grand Prix Layout" },
    { name: "Suzuka Circuit", layout: "East Course" },
    { name: "Suzuka Circuit", layout: "West Course" },
    { name: "Fuji Speedway", layout: "GP Layout" },
    { name: "Fuji Speedway", layout: "Short Layout" },
    { name: "Circuit of the Americas", layout: "COTA GP" },
    { name: "Sebring International Raceway", layout: "12h Full Circuit" },
    { name: "Sebring International Raceway", layout: "Club Course" },
    { name: "Watkins Glen International", layout: "Boot Layout" },
    { name: "Watkins Glen International", layout: "Short Layout" },
    { name: "Red Bull Ring", layout: "Grand Prix Layout" },
    { name: "Red Bull Ring", layout: "National Circuit" },
    { name: "Road Atlanta", layout: "Full Course" }
];

// Complete Assetto Corsa EVO Vehicle Roster Categorized
const acEvoCars = [
    // GT3 / GT4 / GT2 / Racing
    { car: "Ferrari 296 GT3", cls: "GT3 Category" },
    { car: "BMW M4 GT3 EVO", cls: "GT3 Category" },
    { car: "Porsche 911 GT3 R (992)", cls: "GT3 Category" },
    { car: "Audi R8 LMS GT3 Evo II", cls: "GT3 Category" },
    { car: "Ford Mustang GT3", cls: "GT3 Category" },
    { car: "KTM X-BOW GT2", cls: "GT2 Category" },
    { car: "Maserati GT2", cls: "GT2 Category" },
    { car: "Mercedes-AMG GT2", cls: "GT2 Category" },
    { car: "Porsche 911 GT2 RS Clubsport Evo", cls: "GT2 Category" },
    { car: "KTM X-BOW GT4", cls: "GT4 Category" },
    { car: "Audi R8 LMS GT4 Evo", cls: "GT4 Category" },
    { car: "Porsche 718 Cayman GT4 Clubsport", cls: "GT4 Category" },

    // Single-Seaters & One-Make Cup
    { car: "Ferrari SF-25", cls: "Formula 1 2025" },
    { car: "Ferrari F2004", cls: "V10 Formula 1 Classic" },
    { car: "Ferrari 488 Challenge Evo", cls: "One-Make Series" },
    { car: "Lamborghini Huracán Super Trofeo EVO2", cls: "One-Make Series" },
    { car: "Porsche 911 GT3 Cup (992)", cls: "Cup Series" },
    { car: "BMW M2 CS Racing", cls: "Cup Series" },
    { car: "Mazda MX-5 ND Cup", cls: "One-Make Cup" },
    { car: "Caterham Seven Academy", cls: "Single-Seater / Cup" },

    // Road, Sports & Hypercars
    { car: "Ferrari Daytona SP3", cls: "Hypercar / Halo" },
    { car: "Ferrari 296 GTB", cls: "Road Supercar" },
    { car: "Ferrari 288 GTO", cls: "Classic Supercar" },
    { car: "Alfa Romeo Giulia GTAm", cls: "Sports Sedan" },
    { car: "Alfa Romeo Junior Veloce", cls: "Compact Hot Hatch" },
    { car: "Alpine A110 S", cls: "Lightweight Sports" },
    { car: "Alpine A290_β", cls: "EV Hot Hatch Concept" },
    { car: "Audi RS 3 Sportback", cls: "Sports Compact" },
    { car: "Audi RS 6 Avant", cls: "Performance Wagon" },
    { car: "BMW M2 (G87)", cls: "Sports Coupe" },
    { car: "BMW M4 CSL (G82)", cls: "Performance Coupe" },
    { car: "BMW M8 Competition", cls: "Grand Tourer" },
    { car: "Caterham Seven 485 CSR", cls: "Trackday Special" },
    { car: "Chevrolet Camaro ZL1 1LE", cls: "American Track Sports" },
    { car: "Dallara Stradale", cls: "Lightweight Trackday" },
    { car: "Honda S2000", cls: "Roadster Sports" },
    { car: "Hyundai i30 N", cls: "Hot Hatchback" },
    { car: "Hyundai N Vision 74", cls: "Hydrogen Sports Concept" },
    { car: "Lamborghini Huracán STO", cls: "Track Supercar" },
    { car: "Lotus Emira", cls: "Mid-Engine Sports" },
    { car: "Porsche 911 GT3 RS (992)", cls: "Track Supercar" },
    { car: "Porsche 718 Cayman GT4 RS", cls: "Sports Coupe" },
    { car: "Toyota GR86", cls: "Sports Coupe" },
    { car: "Volkswagen Golf 8 GTI Clubsport", cls: "Hot Hatchback" },
    { car: "Volkswagen Golf 8 R", cls: "AWD Performance Hatch" },

    // Historic & Modern Classics
    { car: "Alfa Romeo 75 Turbo Evoluzione", cls: "Historic Touring" },
    { car: "Alfa Romeo Giulia Sprint GTA", cls: "Classic Racing" },
    { car: "Audi Sport Quattro (1983)", cls: "Historic Rally Legend" },
    { car: "BMW M3 E30 Sport Evo", cls: "Historic Touring" },
    { car: "BMW M3 E46 CSL", cls: "Modern Classic" },
    { car: "Ferrari F40 LM", cls: "Historic GT Racing" },
    { car: "Ford Escort RS Cosworth", cls: "90s Rally Classic" },
    { car: "Honda NSX-R (1992)", cls: "Japanese Classic" },
    { car: "Lancia Delta HF Integrale Evo II", cls: "Rally Classic" },
    { car: "Mercedes-Benz 190E 2.5-16 Evo II", cls: "DTM Classic" },
    { car: "Mini Cooper S Mk VI", cls: "Classic Compact" },
    { car: "Nissan Datsun 240Z (S30) Tuned", cls: "Tuned Classic" },
    { car: "Peugeot 205 Turbo 16", cls: "Group B Rally Classic" },
    { car: "Porsche 935", cls: "Historic GT Legend" },
    { car: "Porsche 911 Turbo 3.6 (964)", cls: "Classic Sports" },
    { car: "Toyota Supra Turbo RZ (Mk IV) Drift", cls: "Tuned / Drift Spec" },
    { car: "Toyota AE86 Trueno Tuned", cls: "Tuned Japanese Classic" }
];

const acEvoTimes = [
    { time: "06:15", desc: "Early Dawn / Sunrise" },
    { time: "08:30", desc: "Morning Sun" },
    { time: "12:00", desc: "Midday Overhead Sun" },
    { time: "16:45", desc: "Late Afternoon" },
    { time: "18:50", desc: "Golden Hour / Sunset" },
    { time: "21:30", desc: "Dusk / Night Fall" },
    { time: "00:00", desc: "Midnight Stint" }
];

const acEvoWeather = [
    { name: "Clear & Sunny", cond: "Optimum Track Rubber" },
    { name: "Light Cloud Cover", cond: "Cool Track / High Grip" },
    { name: "Heavy Overcast", cond: "Low Ambient Temperature" },
    { name: "Light Drizzle", cond: "Damp Racing Line" },
    { name: "Heavy Rain", cond: "Wet Track / Standing Water" },
    { name: "Stormy Monsoon", cond: "Extreme Standing Water" },
    { name: "Patchy Low Fog", cond: "Reduced Visibility" },
    { name: "Damp Drying Track", cond: "Evolving Line" },
    { name: "Dynamic Weather", cond: "Evolving Track Conditions" }
];

// Timer Configuration
const TOTAL_SECONDS = (65 * 60);
const RACE_SECONDS = (60 * 60);
const GRACE_DURATION = (5 * 60);

let sessionStartTimestamp = null;
let timerSecondsLeft = TOTAL_SECONDS;
let timerInterval = null;
let timerState = 'STOPPED';

function connect() {
    ws = new WebSocket('wss://' + location.host + '/events');

    ws.onopen = function (event) {
        send("init");
    };

    ws.onerror = function (event) {
        ws.close();
    };

    ws.onclose = function (event) {
        connect();
    };

    ws.onmessage = function (event) {
        const data = event.data;
        const index = data.indexOf(":");
        if(index === -1) {
            return console.warn("Malformed message:", data);
        }

        const type = data.substring(0, index);
        const payload = data.substring(index + 1);

        switch (type) {
            case "init":
                return init(payload);
            case "update":
                return update(payload);
            case "event":
                const eventData = JSON.parse(payload);
                applyEventData(eventData);
                if(eventData.startTimestamp) {
                    sessionStartTimestamp = eventData.startTimestamp;
                }
                if(eventData.totalSeconds) {
                    timerSecondsLeft = eventData.totalSeconds;
                }
                timerState = eventData.state || 'RUNNING';
                startClientTimerLoop();
                return;
            default:
                return console.warn("Unhandled message type:", type);
        }
    };

    function init(payload) {
        resetSessionData();
    }

    function resetSessionData() {
        window.driversStore = {};
        window.previousPositions = {};
        window.activeTelemetryDriver = null;
        $('#leaderboardRows').empty();

        $('#driver').text('--');
        $('#nation').text('--');
        $('#carModel').text('--');
        $('#currentLapTimeMs').text("00:00.000");
        $('#deltaTimeMs').text("0.000s");
    }

    function formatGear(rawGear) {
        if (rawGear === undefined || rawGear === null) return "N";
        const adjustedGear = rawGear - 1;
        if (adjustedGear < 0) return "R";
        if (adjustedGear === 0) return "N";
        return adjustedGear.toString();
    }

    function shouldResetForTrackChange(incomingDriverName, incomingTrack, incomingConfig) {
        const incomingKey = `${incomingTrack || ''}_${incomingConfig || ''}`;
        const activeDrivers = Object.values(window.driversStore).filter(
            d => d && d.name && d.name.trim() !== ""
        );

        if (activeDrivers.length === 0) return false;

        return activeDrivers.every(driver => {
            if (driver.name === incomingDriverName) return true;
            const existingKey = `${driver.track || ''}_${driver.trackConfiguration || ''}`;
            return existingKey === incomingKey;
        });
    }

    function update(payload) {
        const json = payload.replace(/^update:/, '');
        let telemetry;

        try {
            telemetry = JSON.parse(json);
        } catch (e) {
            console.error("Invalid Telemetry JSON payload:", e);
            return;
        }

        if (!telemetry || !telemetry.name || telemetry.name.trim() === "") {
            return;
        }

        if (shouldResetForTrackChange(telemetry.name, telemetry.track, telemetry.trackConfiguration)) {
            resetSessionData();
        }

        window.driversStore[telemetry.name] = telemetry;

        if (!window.activeTelemetryDriver) {
            window.activeTelemetryDriver = telemetry.name;
        }

        if (telemetry.name === window.activeTelemetryDriver) {
            updateTelemetryView(telemetry);
        }

        renderLeaderboard();
    }
}

function send(data) {
    if (!ws) return;
    if (ws.readyState === 1) {
        ws.send(data);
        return;
    }
    if (ws.readyState === 0) {
        setTimeout(() => {
            send(data);
        }, 10);
        return;
    }
}

function formatLapTime(ms) {
    if (!ms || ms <= 0) return "00:00.000";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateTelemetryView(telemetry) {
    if (!telemetry) return;

    $('#driver').text(telemetry.name || '--');
    $('#nation').text((telemetry.nation || '--').toUpperCase());
    $('#carModel').text(telemetry.carModel || 'Unknown Vehicle');

    $('#sessionTrack').text(telemetry.track || '--');
    $('#sessionConfig').text(telemetry.trackConfiguration ? `(${telemetry.trackConfiguration})` : '');
    $('#sessionCar').text(telemetry.carModel || '--');

    $('#gear').text(formatGear(telemetry.gear));
    $('#totalLapCount').text(telemetry.totalLapCount !== undefined ? telemetry.totalLapCount : 0);

    $('#speedMph').text(telemetry.speedMph !== undefined ? telemetry.speedMph : 0);
    $('#speedKmh').text(telemetry.speedKmh !== undefined ? telemetry.speedKmh : 0);

    const accelPct = Math.round((telemetry.acceleratorPercent || 0) * 100);
    const brakePct = Math.round((telemetry.brakePercent || 0) * 100);
    const clutchPct = Math.round((telemetry.clutchPercent || 0) * 100);

    $('#acceleratorPercent').text(accelPct + '%');
    $('#accelBar').css('width', accelPct + '%');

    $('#brakePercent').text(brakePct + '%');
    $('#brakeBar').css('width', brakePct + '%');

    $('#clutchPercent').text(clutchPct + '%');
    $('#clutchBar').css('width', clutchPct + '%');

    $('#currentLapTimeMs').text(formatLapTime(telemetry.currentLapTimeMs));
    $('#predictedLapTimeMs').text(formatLapTime(telemetry.predictedLapTimeMs));
    $('#lastLaptimeMs').text(formatLapTime(telemetry.lastLaptimeMs));
    $('#bestLaptimeMs').text(formatLapTime(telemetry.bestLaptimeMs));

    const $validEl =$('#isValidLap');
    if (telemetry.isValidLap === false) {
        $validEl.text('INVALID')
            .removeClass('bg-emerald-500/10 text-emerald-400 border-emerald-500/30')
            .addClass('bg-rose-500/10 text-rose-400 border-rose-500/30');
    } else {
        $validEl.text('VALID')
            .removeClass('bg-rose-500/10 text-rose-400 border-rose-500/30')
            .addClass('bg-emerald-500/10 text-emerald-400 border-emerald-500/30');
    }

    const deltaMs = telemetry.deltaTimeMs || 0;
    const deltaSec = (deltaMs / 1000).toFixed(3);
    const $deltaEl =$('#deltaTimeMs');

    if (deltaMs < 0) {
        $deltaEl.text(deltaSec + 's')
            .removeClass('text-slate-300 text-rose-400')
            .addClass('text-emerald-400');
    } else if (deltaMs > 0) {
        $deltaEl.text('+' + deltaSec + 's')
            .removeClass('text-slate-300 text-emerald-400')
            .addClass('text-rose-400');
    } else {
        $deltaEl.text('0.000s')
            .removeClass('text-emerald-400 text-rose-400')
            .addClass('text-slate-300');
    }
}

function renderLeaderboard() {
    const drivers = Object.values(window.driversStore).filter(
        d => d && d.name && d.name.trim() !== ""
    );

    if (drivers.length === 0) {
        $('#leaderboardRows').empty();
        return;
    }

    drivers.sort((a, b) => {
        const timeA = a.bestLaptimeMs && a.bestLaptimeMs > 0 ? a.bestLaptimeMs : Number.MAX_SAFE_INTEGER;
        const timeB = b.bestLaptimeMs && b.bestLaptimeMs > 0 ? b.bestLaptimeMs : Number.MAX_SAFE_INTEGER;
        return timeA - timeB;
    });

    const leaderBestTime = drivers[0].bestLaptimeMs || 0;
    const $container = $('#leaderboardRows');

    drivers.forEach((driver, idx) => {
        const position = idx + 1;
        const driverId = 'driver-row-' + driver.name.replace(/[^a-zA-Z0-9]/g, '_');
        const bestLapStr = formatLapTime(driver.bestLaptimeMs);

        let gapStr = '-';
        if (idx > 0 && driver.bestLaptimeMs && leaderBestTime > 0) {
            const gapMs = driver.bestLaptimeMs - leaderBestTime;
            gapStr = `+${(gapMs / 1000).toFixed(3)}s`;
        }

        let $row =$('#' + driverId);

        if ($row.length === 0) {
            const rowHtml = `
                <tr id="${driverId}" class="driver-row-clickable transition-all duration-300 ease-in-out hover:bg-slate-900/80 cursor-pointer">
                    <td class="pos-cell py-3 px-4 text-center font-bold text-purple-400">${position}</td>
                    <td class="py-3 px-4">
                        <div class="flex items-center space-x-2">
                            <span class="driver-name font-bold text-white">${driver.name}</span>
                            <span class="driver-nation text-[10px] bg-slate-800 text-slate-400 border border-slate-700/60 px-1.5 py-0.5 rounded uppercase">${driver.nation || 'GL'}</span>
                        </div>
                    </td>
                    <td class="car-model py-3 px-4 text-slate-400">${driver.carModel || '--'}</td>
                    <td class="best-lap py-3 px-4 text-center font-bold text-purple-300">${bestLapStr}</td>
                    <td class="gap-cell py-3 px-4 text-center text-slate-400">${gapStr}</td>
                    <td class="laps-cell py-3 px-4 text-center text-amber-400 font-bold">${driver.totalLapCount || 0}</td>
                </tr>
            `;
            $row = $(rowHtml);$row.on('click', () => selectDriverTelemetry(driver.name));
            $container.append($row);
        } else {
            $row.find('.pos-cell').text(position);
            $row.find('.car-model').text(driver.carModel || '--');$row.find('.best-lap').text(bestLapStr);
            $row.find('.gap-cell').text(gapStr);$row.find('.laps-cell').text(driver.totalLapCount || 0);
        }

        const prevPos = window.previousPositions[driver.name];
        if (prevPos !== undefined && prevPos !== position) {
            const highlightClass = position < prevPos ? 'bg-emerald-500/20' : 'bg-rose-500/20';
            $row.addClass(highlightClass);
            setTimeout(() => {
                $row.removeClass(highlightClass);
            }, 1200);
        }
        window.previousPositions[driver.name] = position;

        $container.append($row);
    });
}

function selectDriverTelemetry(driverName) {
    window.activeTelemetryDriver = driverName;
    const driverData = window.driversStore[driverName];
    if (driverData) {
        updateTelemetryView(driverData);
    }
    switchTab('telemetry');
}

// Calculate remaining session time using Epoch Timestamp
function calculateRemainingTime() {
    if (timerState !== 'RUNNING' || !sessionStartTimestamp) {
        return timerSecondsLeft;
    }

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - sessionStartTimestamp) / 1000);
    const remaining = TOTAL_SECONDS - elapsedSeconds;

    return Math.max(0, remaining);
}

function startClientTimerLoop() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timerSecondsLeft = calculateRemainingTime();
        updateTimerDisplay();

        if (timerSecondsLeft <= 0) {
            stopClientTimerLoop();
            timerState = 'STOPPED';
        }
    }, 1000);

    timerSecondsLeft = calculateRemainingTime();
    updateTimerDisplay();
}

function stopClientTimerLoop() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSecondsLeft / 60);
    const secs = timerSecondsLeft % 60;
    const hrs = Math.floor(mins / 60);
    const displayMins = mins % 60;

    const timeStr = `${String(hrs).padStart(2, '0')}:${String(displayMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Update both Roulette display and Session Header Bar display
    $('#timer-display').text(timeStr);
    $('#header-timer-display').text(timeStr);

    const $headerBox =$('#header-timer-container');
    const $headerBadge =$('#header-timer-badge');
    const $headerLabel =$('#header-timer-label');

    if (timerSecondsLeft > RACE_SECONDS) {
        const graceLeft = timerSecondsLeft - RACE_SECONDS;
        const gracePct = ((graceLeft / GRACE_DURATION) * 100).toFixed(1);
        $('#bar-grace').css('width', gracePct + '%');
        $('#bar-main').css('width', '100%');

        $('#timer-phase-badge')
            .text('5-MIN LOADING GRACE PERIOD ACTIVE')
            .removeClass('bg-purple-950/80 text-purple-300 border-purple-500/50 bg-rose-950/80 text-rose-400 border-rose-500/50')
            .addClass('bg-amber-950/80 text-amber-400 border-amber-500/50');
        $('#timer-sub-text').text(`Loading Grace: ${Math.floor(graceLeft / 60)}m ${graceLeft % 60}s remaining before Green Flag`);

        $headerLabel.text('Grace Period:');
        $headerBadge.text('GRACE').removeClass().addClass('text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/50 uppercase');$headerBox.removeClass().addClass('flex items-center space-x-2 bg-amber-950/30 border border-amber-500/40 px-3 py-1.5 rounded-lg transition-all duration-300');
    }
    else if (timerSecondsLeft > 0) {
        $('#bar-grace').css('width', '0%');
        const mainPct = ((timerSecondsLeft / RACE_SECONDS) * 100).toFixed(1);
        $('#bar-main').css('width', mainPct + '%');

        const isLowTime = timerSecondsLeft <= 300;

        $('#timer-phase-badge')
            .text(isLowTime ? 'RACE FINAL MINUTES' : 'MAIN 60-MIN RACE IN PROGRESS')
            .removeClass('bg-amber-950/80 text-amber-400 border-amber-500/50 bg-rose-950/80 text-rose-400 border-rose-500/50 bg-purple-950/80 text-purple-300 border-purple-500/50')
            .addClass(isLowTime ? 'bg-rose-950/80 text-rose-400 border-rose-500/50 animate-pulse' : 'bg-purple-950/80 text-purple-300 border-purple-500/50');
        $('#timer-sub-text').text(`Main Race: ${Math.floor(timerSecondsLeft / 60)}m ${timerSecondsLeft % 60}s remaining`);

        $headerLabel.text('Race Time:');
        if (isLowTime) {
            $headerBadge.text('LOW TIME').removeClass().addClass('text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-500/60 uppercase animate-pulse');$headerBox.removeClass().addClass('flex items-center space-x-2 bg-rose-950/40 border border-rose-500/50 px-3 py-1.5 rounded-lg transition-all duration-300 animate-pulse');
        } else {
            $headerBadge.text('RACE').removeClass().addClass('text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/50 uppercase');$headerBox.removeClass().addClass('flex items-center space-x-2 bg-purple-950/30 border border-purple-500/40 px-3 py-1.5 rounded-lg transition-all duration-300');
        }
    }
    else {
        $('#bar-grace').css('width', '0%');
        $('#bar-main').css('width', '0%');

        $('#timer-phase-badge')
            .text('SESSION COMPLETED')
            .removeClass('bg-purple-950/80 text-purple-300 border-purple-500/50 bg-amber-950/80 text-amber-400 border-amber-500/50')
            .addClass('bg-rose-950/80 text-rose-400 border-rose-500/50');
        $('#timer-sub-text').text('Checkered Flag - Session Complete');

        $headerLabel.text('Session Status:');
        $headerBadge.text('FINISHED').removeClass().addClass('text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-rose-400 border border-rose-800/60 uppercase');$headerBox.removeClass().addClass('flex items-center space-x-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg transition-all duration-300');
    }
}

function applyEventData(eventObj) {
    if (!eventObj) return;

    if (eventObj.track) $('#slot-track').text(eventObj.track);
    if (eventObj.layout) $('#slot-layout').text(eventObj.layout);
    if (eventObj.car) $('#slot-car').text(eventObj.car);
    if (eventObj.carClass) $('#slot-class').text(eventObj.carClass);
    if (eventObj.time) $('#slot-time').text(eventObj.time);
    if (eventObj.timeDesc) $('#slot-tod-desc').text(eventObj.timeDesc);
    if (eventObj.weather) $('#slot-weather').text(eventObj.weather);
    if (eventObj.weatherCond) $('#slot-track-cond').text(eventObj.weatherCond);

    if (eventObj.track) $('#sessionTrack').text(eventObj.track);
    if (eventObj.layout) $('#sessionConfig').text(`(${eventObj.layout})`);
    if (eventObj.car) $('#sessionCar').text(eventObj.car);
}

function startSessionWithGrace() {
    if(timerState === 'RUNNING') {
        return;
    }

    sessionStartTimestamp = Date.now();
    timerState = 'RUNNING';
    startClientTimerLoop();
}

function spinRoulette() {
    $('#btn-spin').prop('disabled', true).addClass('opacity-50');
    let ticks = 0;
    const maxTicks = 20;

    let finalTrack, finalCar, finalTime, finalWeather;

    const interval = setInterval(() => {
        finalTrack = acEvoTracks[Math.floor(Math.random() * acEvoTracks.length)];
        finalCar = acEvoCars[Math.floor(Math.random() * acEvoCars.length)];
        finalTime = acEvoTimes[Math.floor(Math.random() * acEvoTimes.length)];
        finalWeather = acEvoWeather[Math.floor(Math.random() * acEvoWeather.length)];

        $('#slot-track').text(finalTrack.name);
        $('#slot-layout').text(finalTrack.layout);
        $('#slot-car').text(finalCar.car);
        $('#slot-class').text(finalCar.cls);
        $('#slot-time').text(finalTime.time);
        $('#slot-tod-desc').text(finalTime.desc);
        $('#slot-weather').text(finalWeather.name);
        $('#slot-track-cond').text(finalWeather.cond);

        ticks++;
        if (ticks >= maxTicks) {
            clearInterval(interval);
            $('#btn-spin').prop('disabled', false).removeClass('opacity-50');

            sessionStartTimestamp = Date.now();

            const eventPayload = {
                track: finalTrack.name,
                layout: finalTrack.layout,
                car: finalCar.car,
                carClass: finalCar.cls,
                time: finalTime.time,
                timeDesc: finalTime.desc,
                weather: finalWeather.name,
                weatherCond: finalWeather.cond,
                totalSeconds: TOTAL_SECONDS,
                startTimestamp: sessionStartTimestamp,
                state: 'RUNNING'
            };

            applyEventData(eventPayload);
            startSessionWithGrace();

            send("event:" + JSON.stringify(eventPayload));
        }
    }, 80);
}

function switchTab(tab) {
    $('#tab-leaderboard, #tab-telemetry, #tab-roulette').addClass('hidden');
    $('#btn-tab-leaderboard, #btn-tab-telemetry, #btn-tab-roulette')
        .removeClass('bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold')
        .addClass('text-slate-400');

    if (tab === 'leaderboard') {
        $('#tab-leaderboard').removeClass('hidden');
        $('#btn-tab-leaderboard').addClass('bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold').removeClass('text-slate-400');
    } else if (tab === 'telemetry') {
        $('#tab-telemetry').removeClass('hidden');
        $('#btn-tab-telemetry').addClass('bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold').removeClass('text-slate-400');
    } else if (tab === 'roulette') {
        $('#tab-roulette').removeClass('hidden');
        $('#btn-tab-roulette').addClass('bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold').removeClass('text-slate-400');
    }
}

// Attach Event Listeners on DOM Ready
$(document).ready(function() {$('#btn-tab-leaderboard').on('click', () => switchTab('leaderboard'));
    $('#btn-tab-telemetry').on('click', () => switchTab('telemetry'));
    $('#btn-tab-roulette').on('click', () => switchTab('roulette'));
    $('#btn-spin').on('click', spinRoulette);
    connect();
});