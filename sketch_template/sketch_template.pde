PShader shader;

void setup() {
  size(680, 420, P2D);
  background(255);
  shader = loadShader("shader_template.frag");
}

void draw() {
  background(255);
  
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);
  shader(shader);
  rect(0,0,width,height);
  
  resetShader();
  textSize(width/25);
  textAlign(CENTER, CENTER);
  text("template", width/2, height/2); 
  fill(0);
}