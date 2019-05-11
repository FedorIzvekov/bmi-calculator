document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calculate").addEventListener("click", calculateBMI);
});

function changeImage(newSrc) {
    document.getElementById('genderImage').src = newSrc;
}

function calculateBMI() {
    const elementAge = document.getElementById("age");
    const elementWeight = document.getElementById("weight");
    const elementHeight = document.getElementById("height");

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(elementAge.value);
    const weight = parseFloat(elementWeight.value);
    const height = parseFloat(elementHeight.value);

    if (
        isValid(elementAge, age)
        && isValid(elementWeight, weight)
        && isValid(elementHeight, height)
    ) {
        const bmi = calculateBMIValue(weight, height);
        displayBMIResult(bmi, gender, age, height);
    }
}

function isValid(element, value) {
    const fieldName = element.id;
    const minValues = { age: 18, weight: 30, height: 140 };
    const maxValues = { age: 100, weight: 300, height: 210 };

    if (isNaN(value) || value < minValues[fieldName] || value > maxValues[fieldName]) {
        displayInvalid(element, `Please enter a valid ${fieldName} between ${minValues[fieldName]} and ${maxValues[fieldName]}.`);
        return false;
    } else {
        displayValid(element);
        return true;
    }
}

function displayInvalid(element, message) {
    element.setCustomValidity(message);
    element.reportValidity();
    element.style.border = "2px solid red";
}

function displayValid(element) {
    element.setCustomValidity("");
    element.style.border = "";
}

function calculateBMIValue(weight, height) {
    return (1.3 * (weight / Math.pow(height / 100, 2.5))).toFixed(2);
}

function displayBMIResult(bmi, gender, age, height) {
    const bmiCategory = getBmiCategory(bmi, gender);
    const recommendedWeight = calculateRecommendedWeight(height, gender, age);

    document.getElementById("bmiResult").textContent = `${bmi}`;
    document.getElementById("bmiCategory").textContent = `${bmiCategory}`;
    document.getElementById("recommendedWeight").textContent = `${recommendedWeight} kg`;
}

function getBmiCategory(bmi, gender) {
    const categories = gender === "male"
        ? { underweight: 18.5, normal: 24.9, overweight: 29.9 }
        : { underweight: 18.5, normal: 23.9, overweight: 28.9 };

    if (bmi < categories.underweight) return "Underweight";
    if (bmi <= categories.normal) return "Normal weight";
    if (bmi <= categories.overweight) return "Overweight";
    return "Obese";
}

function calculateRecommendedWeight(height, gender, age) {
    const genderFactor = gender === "male" ? 21.7 : 21.2;
    const ageFactor = age * 0.03
    return Math.round(genderFactor / 1.3 * Math.pow(height / 100, 2.5) + ageFactor);
}
